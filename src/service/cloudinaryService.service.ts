interface CloudnaryService{
    uploadImage(image: Express.Multer.File ) : Promise<string>;
    uploadSingle(file: Express.Multer.File): Promise<string>;
    uploadMultiple(files: Express.Multer.File[]): Promise<any>
}

export default CloudnaryService;