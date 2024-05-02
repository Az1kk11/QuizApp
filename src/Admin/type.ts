export interface categorieState {
    id: number,
    name: string,
    questions: number
}

export interface resultState {
    id: number,
    result: string,
    user: {
        id: number,
        name: string,
    },
    category: {
        id: number,
        name: string
    },
    submitted: string
}


export interface usersState {
    id: number,
    name: string,
    results: number,
}
