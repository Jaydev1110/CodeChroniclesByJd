import { DialogChoice, DialogNode, DialogTrees } from ".";

export type NodeIds = "dummy_node";
export type ChoiceIds = "dummy_choice";

export const NODES: {
  [key in NodeIds]: DialogNode;
} = {
  dummy_node: {
    text: "...",
    choiceIds: [],
  },
};

export const CHOICES: {
  [key in ChoiceIds]: DialogChoice;
} = {
  dummy_choice: {
    text: "...",
  },
};

export const TREES: DialogTrees = {};
