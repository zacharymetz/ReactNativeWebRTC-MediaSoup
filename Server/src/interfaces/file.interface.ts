
export interface File extends FileWithoutBuffer {
    buffer: Buffer;
}
export interface FileWithoutBuffer {
    id: string;
    sizeInBytes: number;
    bucket: string;
    key: string;
    fileType: string;
    dateUpdaled: Date;
    UploadedByUser:number;
}

