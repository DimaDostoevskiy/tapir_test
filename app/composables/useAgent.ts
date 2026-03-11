import type {IPostFormPayload} from "../types/blog";

interface IAiGenerateError {
    error: { message: string }
}

interface IAiGenerateSuccess {
    choices: Array<{ message: { content: string } }>
}

interface IFetchDeepSeekResponse {
    message?: string,
    result: IPostFormPayload | null,
}

export default () => {
    const parseResponse = (data: IAiGenerateSuccess): object => {
        let content = data.choices[0]?.message.content
        if (content) {
            return JSON.parse(content.replace(/<think>[\s\S]*?<\/think>/g, '').trim())
        } else {
            return {}
        }
    }

    const fetchDeepSeek = async (promptTheme: string): Promise<IFetchDeepSeekResponse> => {
        try {
            const res = await $fetch('/api/ai/generate-post', {
                method: 'POST',
                body: {promptTheme},
            });

            const data = res as IAiGenerateError | IAiGenerateSuccess;

            if ('error' in data && data.error) {
                return {
                    message: data.error.message || 'Ошибка при запросе',
                    result: null
                }
            } else {
                return {
                    result: parseResponse(data as IAiGenerateSuccess) as IPostFormPayload
                }

            }
        } catch (err) {
            return {
                message: 'Ошибка при создании поста',
                result: null
            }
        }
    };

    return {
        fetchDeepSeek
    }
}
