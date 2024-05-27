// src/app/weapon-tree.types.ts

export interface Statistic {
    id: number;
    label: string;
    type: number;
    abreviation: string;
    pivot: {
      tree_id: number;
      statistic_id: number;
    };
  }
  
  export interface Stereotype {
    id: number;
    label: string;
    pivot: {
      tree_id: number;
      stereotype_id: number;
    };
  }
  
  export interface Range {
    id: number;
    label: string;
  }
  
  export interface TypeDamage {
    id: number;
    label: string;
  }
  
  export interface Tree {
    id: number;
    name: string;
    description: string;
    dice: string;
    passive_innate: string;
    passive_innate_description: string;
    range: Range;
    range_id: number;
    skills: any[]; // Remplacez 'any' par le type approprié si possible
    statistics: Statistic[];
    statuses: any[]; // Remplacez 'any' par le type approprié si possible
    stereotypes: Stereotype[];
    type_damage: TypeDamage;
    type_damage_id: number;
    type_tree: any; // Remplacez 'any' par le type approprié si possible
    type_tree_id: number;
    ultimate_skill: string;
    ultimate_skill_description: string;
  }
  