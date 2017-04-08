
export interface SearchFilterItem {
    enabled: boolean;
    name: string;
    operators: string[];
    operator: string;

    start: string;
    end?: string;

    isValid(): boolean;
}
