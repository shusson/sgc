import { Injectable } from '@angular/core';

enum ColumnType {
    String = "STR",
    BigInt = "BIGINT",
    SmallInt = "SMALLINT",
    Float = "FLOAT"
}

class Column {
    name = '';
    type: ColumnType;
    is_array: boolean;
    is_dict: boolean;
}

@Injectable()
export class MapdFilterService {
    columns = [];

// {name: "VARIANT", type: "STR", is_array: false, is_dict: true}
// 1
// :
// {name: "CHROMOSOME", type: "STR", is_array: false, is_dict: true}
// 2
// :
// {name: "c3_START", type: "BIGINT", is_array: false, is_dict: false}
// 3
// :
// {name: "c4_REF", type: "STR", is_array: false, is_dict: true}
// 4
// :
// {name: "ALT", type: "STR", is_array: false, is_dict: true}
// 5
// :
// {name: "RSID", type: "STR", is_array: false, is_dict: true}
// 6
// :
// {name: "AC", type: "SMALLINT", is_array: false, is_dict: false}
// 7
// :
// {name: "AF", type: "FLOAT", is_array: false, is_dict: false}
// 8
// :
// {name: "TYPE", type: "STR", is_array: false, is_dict: true}
// 9
// :
// {name: "CATO", type: "FLOAT", is_array: false, is_dict: false}
// 10
// :
// {name: "eigen", type: "FLOAT", is_array: false, is_dict: false}
// 11
// :
// {name: "sift", type: "STR", is_array: false, is_dict: true}
// 12
// :
// {name: "polyPhen", type: "STR", is_array: false, is_dict: true}
// 13
// :
// {name: "tgpAF", type: "FLOAT", is_array: false, is_dict: false}
    constructor() {
    }

}
