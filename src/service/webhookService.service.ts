interface WebhookService {
    handle(data: any): Promise<void> | void;
    verify(hash: string, data: any): Promise<boolean> | boolean;
}

export default WebhookService;