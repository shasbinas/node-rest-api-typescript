export interface IStudent extends Document {
  name: string;
  marks: number;
  class: string;
}

export interface StudentRequestBody {
  name: string;
  marks: number;
  class: string;
}

/**
 * 🧩 Interface for query parameters
 */
export interface StudentQuery {
  class?: string;
}
