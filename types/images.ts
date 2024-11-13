export interface Image {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
}

export interface ImagesResponse {
  ok: boolean;
  status: number;
  message: string;
  images: Image[] | [];
}
