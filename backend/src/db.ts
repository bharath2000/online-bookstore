import pg, { QueryResult } from 'pg'
const { Pool } = pg
import { Request, Response, response } from 'express'
import { Book } from './Book';
import dotenv from 'dotenv'
dotenv.config()

interface book {
    title: String,
    authors: String[], 
    shortDescription: String | null,
    longDescription: String | null, 
    categories: String[] | null,
    thumbnailUrl: String | null,

}

const user = process.env.POSTGRESQL_USER
const database = process.env.POSTGRESQL_DB
const password = process.env.POSTGRESQL_PASSWORD

export default class db {
  private pool
  constructor() {
    // console.log("db constructor called");
    this.pool = new Pool({
      host: 'localhost',
      user: user,
      max: 10,
      database: database,
      password: password,
      port: 5432,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      
    });
  }

  async getUser(query: string, values: Array<string>, cb: (err: any, user: any) => void): Promise<any> {
    try {
      const result = await this.pool.query(query, values);
      cb(null, result.rows);
      // return result.rows
    } catch (error) {
      cb(error, null);
      throw error;
    }
  }

  async createUser(email: string, password: string, username: string) {
    try {
      const query='INSERT INTO users(email, password, name) VALUES($1, $2, $3)';
      const values=[email, password, username];
      const result = await this.pool.query(query, values);
    } catch (error) {
      throw error;
    }
    
  }
  
  async getBooks(): Promise<Array<any>> {
    try {
      const result = await this.pool.query('SELECT * FROM books ORDER BY id ASC');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getBook(bookId: string): Promise<any> {
    try {
        const result = await this.pool.query('SELECT * FROM books where id=$1', [bookId]);
        return result.rows;
    } catch (error) {
      throw error;
    }
  }
  async getBooksOfUser(userId: string) {
    try {
      const result = await this.pool.query('SELECT * FROM books where books.id IN (SELECT book_id from user_book where user_id=$1)', [userId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async addBookOfUser(userId: string, bookId: string) {
    try {
      const query='INSERT into user_book(user_id, book_id) VALUES($1, $2)'
      const result = await this.pool.query(query, [userId, bookId]);
      return result.rows
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getBooksByCategory(category: string) {
    try {
      const result = await this.pool.query('SELECT * FROM books WHERE $1 IN (SELECT unnest(categories))',[category]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getBooksByAuthor(author: string) {
    try {
      const result = await this.pool.query('SELECT * FROM books WHERE $1 IN (SELECT unnest(authors))',[author]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async createBook(title: string, authors: string, shortDescription: string, longDescription: string, categories: string, thumbnailUrl: string){
    try {
      const query='INSERT INTO books(title, authors, shortDescription, longDescription, categories, thumbnailUrl) VALUES($1, $2, $3, $4, $5, $6)'
      const values=[title, authors, shortDescription, longDescription, categories, thumbnailUrl];
      const result = await this.pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }

}


