class Board {
  constructor() {
    this.diff = "easy";
  }

  async getBoard(diff) {
    const res = await fetch(
      `https://sugoku.herokuapp.com/board?difficulty=${diff}`
    );
    const data = await res.json();
    // return data.board;
    const boa = data.board;
    // console.log(boa);
    return boa;
    // boa.forEach((z) => {
    //   console.log(z);
    // });
  }
}
