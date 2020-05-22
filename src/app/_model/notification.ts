export interface Notification {
    reasonId: number,
    walletId: number,
    message: string,
    initiatorUser: string,
    isForAll: boolean,
    creationDate: Date
}
