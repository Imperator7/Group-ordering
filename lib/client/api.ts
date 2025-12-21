import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import type { ZodType } from 'zod'

export class ApiError extends Error {
  constructor(message: string, public status?: number, public data?: unknown) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function Get<O>(
  url: string,
  outputSchema: ZodType<O>
): Promise<O> {
  return sendRequest('GET', url, null, null, outputSchema)
}

export async function Post<I, O>(
  url: string,
  input: I,
  inputSchema: ZodType<I>,
  outputSchema: ZodType<O>
): Promise<O> {
  return sendRequest('POST', url, input, inputSchema, outputSchema)
}

export async function Put<I, O>(
  url: string,
  input: I,
  inputSchema: ZodType<I>,
  outputSchema: ZodType<O>
): Promise<O> {
  return sendRequest('PUT', url, input, inputSchema, outputSchema)
}

export async function Patch<I, O>(
  url: string,
  input: I,
  inputSchema: ZodType<I>,
  outputSchema: ZodType<O>
): Promise<O> {
  return sendRequest('PATCH', url, input, inputSchema, outputSchema)
}

export async function Delete(url: string): Promise<void> {
  try {
    await axios.delete(url)
  } catch (err) {
    handleAxiosError(err)
  }
}

async function sendRequest<I, O>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data: unknown,
  inputSchema: ZodType<I> | null,
  outputSchema: ZodType<O>
): Promise<O> {
  const config: AxiosRequestConfig = {
    method,
    url,
  }

  if (inputSchema) {
    const parsedInput = validateInput(data, inputSchema)
    config.data = parsedInput
  }

  try {
    const res = await axios(config)

    const rawData =
      res.data && typeof res.data === 'object' && 'data' in res.data
        ? res.data.data
        : res.data

    return validateOutput(rawData, outputSchema)
  } catch (error) {
    if (error instanceof ApiError) throw error
    return handleAxiosError(error)
  }
}

function validateInput<I>(input: unknown, schema: ZodType<I>): I {
  const parsedInput = schema.safeParse(input)

  if (!parsedInput.success) {
    console.error('Request validation failed:', parsedInput.error)
    throw new ApiError('Invalid request payload')
  }

  return parsedInput.data
}

function validateOutput<O>(output: unknown, schema: ZodType<O>): O {
  const parsedOutput = schema.safeParse(output)

  if (!parsedOutput.success) {
    console.warn(`⚠️ API Validation Failed:`, parsedOutput.error)

    return output as O
  }

  return parsedOutput.data
}

function handleAxiosError(err: unknown): never {
  const error = err as AxiosError

  if (error.response) {
    const { status, data } = error.response
    const message =
      typeof data === 'object' && data && 'message' in data
        ? String((data as { message: string }).message)
        : JSON.stringify(data)
    throw new ApiError(message, status, data)
  }

  if (error.request) {
    throw new ApiError('Network error: no response received')
  }

  throw new ApiError(error.message)
}
