import RockPaperScissors from "./rps";
const mathRandomSpy = jest.spyOn(Math, `random`);

describe(`RockPaperScissors class`, function () {
  describe(`determineWinner()`, function() {
    test(`win cases`, function() {
      const game = new RockPaperScissors();
      expect(game.determineWinner(`rock`, `scissors`)).toBe(`win`);
      expect(game.determineWinner(`scissors`, `paper`)).toBe(`win`);
      expect(game.determineWinner(`paper`, `rock`)).toBe(`win`);
    });
  
    test(`tie cases`, function() {
      const game = new RockPaperScissors();
      expect(game.determineWinner(`rock`, `rock`)).toBe(`tie`);
      expect(game.determineWinner(`paper`, `paper`)).toBe(`tie`);
      expect(game.determineWinner(`scissors`, `scissors`)).toBe(`tie`);
    });
  
    test(`lost cases`, function() {
      const game = new RockPaperScissors();
      expect(game.determineWinner(`scissors`, `rock`)).toBe(`lose`);
      expect(game.determineWinner(`paper`, `scissors`)).toBe(`lose`);
      expect(game.determineWinner(`rock`, `paper`)).toBe(`lose`);
    });
  });
  describe(`generateCPUResponse()`, function () {
    it(`works`, function() {
      mathRandomSpy.mockImplementationOnce(() => 0.1);
      mathRandomSpy.mockImplementationOnce(() => 0.5);
      mathRandomSpy.mockImplementationOnce(() => 0.9);
      const game = new RockPaperScissors();
      const returnValues = Array(3).fill(0).map(i => game.generateCPUResponse());
      const expected = [ `rock`, `paper`,`scissors` ];
      expect(returnValues).toEqual(expect.arrayContaining(expected)); // TODO: use Mocks and Spies instead
    });
  });
});