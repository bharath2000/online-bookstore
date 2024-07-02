export class Book {
    public title: String;
    public authors: String[];
    public shortDescription: String | null;
    public longDescriiption: String | null;
    public categories: String[] | null;
    public thumbnailUrl: String | null;

    constructor(
        title: String,
        authors: String[], 
        shortDescription: String | null,
        longDescription: String | null, 
        categories: String[] | null,
        thumbnailUrl: String | null,
    ) {
        this.title = title;
        this.authors = authors;
        this.shortDescription = shortDescription;
        this.longDescriiption = longDescription;
        this.categories = categories;
        this.thumbnailUrl = thumbnailUrl;
    }
}