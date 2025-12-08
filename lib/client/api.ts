import axios, { AxiosError } from 'axios'
import type { ZodType } from 'zod'

export class ApiError extends Error {
  constructor(message: string, public status?: number, public data?: unknown) {
    super(message)
    this.name = 'ApiError'
  }
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

export async function Get<O>(
  url: string,
  outputSchema: ZodType<O>
): Promise<O> {
  try {
    const res = await axios.get(url)
    const parsed = outputSchema.safeParse(res.data)

    if (!parsed.success) {
      console.error('Response validation failed:', parsed.error.flatten())
      throw new ApiError('Invalid response format')
    }

    return parsed.data
  } catch (err) {
    if (err instanceof ApiError) throw err
    handleAxiosError(err)
  }
}

export async function Post<I, O>(
  url: string,
  input: I,
  inputSchema: ZodType<I>,
  outputSchema: ZodType<O>
): Promise<O> {
  const parsedInput = inputSchema.safeParse(input)

  if (!parsedInput.success) {
    console.error('Request validation failed:', parsedInput.error)
    throw new ApiError('Invalid request payload')
  }

  try {
    const res = await axios.post(url, parsedInput.data)
    const parsedOutput = outputSchema.safeParse(res.data.data)

    if (!parsedOutput.success) {
      console.error('Response validation failed:', parsedOutput.error)
      throw new ApiError('Invalid response format')
    }

    return parsedOutput.data
  } catch (err) {
    if (err instanceof ApiError) throw err
    return handleAxiosError(err)
  }
}

export async function Put<I, O>(
  url: string,
  input: I,
  inputSchema: ZodType<I>,
  outputSchema: ZodType<O>
): Promise<O> {
  const parsedInput = inputSchema.safeParse(input)
  if (!parsedInput.success) {
    throw new ApiError('Invalid request payload')
  }

  try {
    const res = await axios.put(url, parsedInput.data)
    const parsedOutput = outputSchema.safeParse(res.data)

    if (!parsedOutput.success) {
      throw new ApiError('Invalid response format')
    }

    return parsedOutput.data
  } catch (err) {
    if (err instanceof ApiError) throw err
    handleAxiosError(err)
  }
}

export async function Delete(url: string): Promise<void> {
  try {
    await axios.delete(url)
  } catch (err) {
    handleAxiosError(err)
  }
}
