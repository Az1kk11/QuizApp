export interface categorieState {
    id: number,
    name: string,
    questions: number
}

export interface usersState {
    id: number,
    name: string,
    results: number,
}

export interface resultState {
    category: {
        id: number,
        name: string
    },
    id: number,
    result: string,
    submitted: string,
    user: {
        id: number,
        name: string
    }
}