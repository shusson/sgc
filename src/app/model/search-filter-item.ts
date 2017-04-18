export interface SearchFilterItemSerialised {
    enabled: boolean;
    name: string;
    operators: string[];
    operator: string;

    start: string;
    end?: string;
}

export interface SearchFilterItem {
    enabled: boolean;
    name: string;
    operators: string[];
    operator: string;

    start: string;
    end?: string;

    isStartValid(): boolean;
    isEndValid?(): boolean;

    isValid(): boolean;

    startInvalidTooltipText(): string;
    endInvalidTooltipText?(): string;

    isEqual(x: SearchFilterItemSerialised): boolean;

    copy(): SearchFilterItem;
}
