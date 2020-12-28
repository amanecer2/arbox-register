
declare module IMembership {

    export interface MembershipInterface {
        id: number;
        user_fk: number;
        box_fk: number;
        start: string;
        end: string;
        type: string;
        price: number;
        debt: number;
        membership_type_fk: number;
        extra_membership_user_fk?: any;
        groups_id?: any;
        membership_user_reference_id?: any;
        rfid?: any;
        suspended_count: number;
        sessions_left?: any;
        active: number;
        cancelled: number;
        create_by: number;
        deactivate_time?: any;
        membership_union_fk?: any;
        created_at: string;
        updated_at: string;
        deleted_at?: any;
        name: string;
        total_session_membership_type?: any;
    }

}

