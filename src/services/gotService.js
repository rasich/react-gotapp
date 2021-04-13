export default class GotService {

  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api/';
  }

  async getResponse(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  async getAllCharacters() {
    const res = await this.getResponse('characters?page=5&pageSize=10');
    return res.map(this._transformCharacter);
  }
  
  async getCharacter(id) {
    const character = await this.getResponse(`characters/${id}`);
    return this._transformCharacter(character);
  }

  async getAllHouses() {
    const res = await this.getResponse('houses');
    return res.map(this._transformHouse);
  }
  
  async getHouse(id) {
    const house = await this.getResponse(`houses/${id}`);
    return this._transformHouse(house);
  }

  async getAllBooks() {
    const res = await this.getResponse('books');
    return res.map(this._transformBook);
  }
  
  async getBook(id) {
    const book = await this.getResponse(`books/${id}`);
    return this._transformBook(book);
  }

  isSet(data) {
    if (data) {
      return data
    } else {
      return 'no data'
    }
  } 

  _transformCharacter = (char) => {
    return {
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture),
      url: char.url
    }
  }

  _transformHouse = (house) => {
    return {
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(house.ancestralWeapons),
    }
  }

  _transformBook = (book) => {
    return {
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publiser: this.isSet(book.publiser),
      released: this.isSet(book.released)
    }
  }
}