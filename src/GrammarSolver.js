const symbols = require('../db/symbols.json');

// Builds sentences by taking a template and recursing through it until each placeholder is replaced
// by a word. Placeholders are surrounded by "<>" whereas words appear without brackets.
// I did not think of this, this is slightly modified from a homework assignment from CSE 143 @ UW.
class GrammarSolver {
  constructor() {
    // Makes a map with all available symbols. These mirror the symbols in symbols.json.
    this.grammar = new Map();
    this.grammar.set('<s>', symbols.s);
    this.grammar.set('<np>', symbols.np);
    this.grammar.set('<adjp>', symbols.adjp);
    this.grammar.set('<vp>', symbols.vp);
    this.grammar.set('<sentence>', symbols.sentences);

    this.grammar.set('<pn>', symbols.pn);
    this.grammar.set('<adj>', symbols.adj);
    this.grammar.set('<dp>', symbols.dp);
    this.grammar.set('<n>', symbols.n);
    this.grammar.set('<tv>', symbols.tv);
    this.grammar.set('<iv>', symbols.iv);
    this.grammar.set('<p>', symbols.p);

    this.grammar.set('<i>', symbols.i);
    this.grammar.set('<insult>', symbols.insults);
    this.grammar.set('<pi>', symbols.pi);
    this.grammar.set('<idk>', symbols.idk);
  }

  // This builds sentences for the sentence and insult method. Goes through each template in
  // a sentence and replaces it with a word using the helper method.
  getSentence(element) {
    const rules = this.grammar.get(element);
    const index = Math.floor(Math.random() * rules.length);

    let syntax = rules[index];
    syntax = syntax.split(/ +/);
    let sentence = '';

    let i;
    for (i = 0; i < syntax.length; i += 1) {
      if (i === syntax.length - 1) {
        sentence += `${this.getSentenceHelper(syntax[i])}`;
      } else {
        sentence += `${this.getSentenceHelper(syntax[i])} `;
      }
    }

    sentence = sentence.charAt(0).toUpperCase() + sentence.substr(1);
    return (sentence.includes('.') || sentence.includes('?') ? sentence : sentence.concat('.'));
  }

  // Recursive method helper. Takes a template and replaces it with word(s).
  getSentenceHelper(element) {
    if (!element.includes('<') && !element.includes('>')) {
      return element;
    }

    const rules = this.grammar.get(element);
    const index = Math.floor(Math.random() * rules.length);

    let syntax = rules[index];
    syntax = syntax.split(/ +/);

    let subSentence = '';
    let i;
    for (i = 0; i < syntax.length; i += 1) {
      if (i === syntax.length - 1) {
        subSentence += this.getSentenceHelper(syntax[i]);
      } else {
        subSentence += `${this.getSentenceHelper(syntax[i])} `;
      }
    }

    return subSentence;
  }
}
module.exports = GrammarSolver;
