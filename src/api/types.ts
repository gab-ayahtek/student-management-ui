export type Student = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
}

export type PaginatedStudents = {
    current_page: number;
    first_page: number;
    last_page: number;
    data: Student[];
    next_page_url: string;
    prev_page_url: string;
}

export type Course = {
    id: string;
    title: string;
    description: string;
}