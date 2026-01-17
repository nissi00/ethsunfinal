// Mock Resend implementation to prevent errors if imported
export class Resend {
    constructor(apiKey?: string) {
        this.emails = {
            send: async () => {
                console.log("Mock Resend: Email sending is disabled");
                return { data: { id: "mock_id" }, error: null };
            }
        };
    }
    emails: any;
}

export const resend = new Resend(process.env.RESEND_API_KEY);
