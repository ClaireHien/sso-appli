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

export interface FightSkill {
    id: number;
    name: string;
    description: number;
    upgrade: string;
    pivot: {
      stereotype_id: number;
      fight_skill_id: number;
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
  export interface Status {
    id: number;
    name: string;
    description: string;
    healing: string;
  }
  
  export interface Material {
    id: number;
    name: string;
    description: string;
    price: number;
    basic: boolean;
    display: boolean;
    type_material_id: number;
  }

  export interface NeutralSkill {
    id: number;
    name: string;
    description: string;
  }
  
  export interface TypeDamage {
    id: number;
    label: string;
  }
  export interface CraftTable {
    id: number;
    poor: string;
    fair: string;
    super: string;
    good: string;
    excellent: string;
    craft_id: number;
    material_id: number;
  }
  
  export interface CraftSkill {
    id: number;
    name: string;
    description: string;
    craft_id: number;
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
  