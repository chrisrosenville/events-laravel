export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    avatar_url?: string;
}

export interface Event {
    id: number;
    name: string;
    description?: string;
    start_date: string;
    end_date?: string;
    location?: string;
    attending_count: number;
    user_id: number;
    user?: User;
    attendees?: User[];
}

export interface PageProps {
    auth: {
        user: User | null;
    };
    events?: Event[];
    event?: Event;
    createdEvents?: Event[];
    attendingEvents?: Event[];
    isAttending?: boolean;
    attendeeCount?: number;
    flash?: {
        success?: string;
        error?: string;
    };
}
