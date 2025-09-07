// A simple lexer for tokenizing formula strings.
class FormulaLexer {
  tokenize(formula: string) {
    const tokens = [];
    let i = 0;
    while (i < formula.length) {
      const char = formula[i];

      if (/\s/.test(char)) {
        i++;
        continue;
      }

      if (char === '+') {
        tokens.push({ type: 'PLUS', value: '+' });
        i++;
        continue;
      }
      if (char === '-') {
        tokens.push({ type: 'MINUS', value: '-' });
        i++;
        continue;
      }
      if (char === '*') {
        tokens.push({ type: 'MULTIPLY', value: '*' });
        i++;
        continue;
      }
      if (char === '/') {
        tokens.push({ type: 'DIVIDE', value: '/' });
        i++;
        continue;
      }
      if (char === '(') {
        tokens.push({ type: 'LPAREN', value: '(' });
        i++;
        continue;
      }
      if (char === ')') {
        tokens.push({ type: 'RPAREN', value: ')' });
        i++;
        continue;
      }
      if (char === ',') {
        tokens.push({ type: 'COMMA', value: ',' });
        i++;
        continue;
      }

      if (/[0-9]/.test(char)) {
        let numStr = '';
        while (i < formula.length && /[0-9.]/.test(formula[i])) {
          numStr += formula[i];
          i++;
        }
        tokens.push({ type: 'NUMBER', value: numStr });
        continue;
      }

      if (/[A-Za-z_]/.test(char)) {
        let identifier = '';
        while (i < formula.length && /[A-Za-z0-9_]/.test(formula[i])) {
          identifier += formula[i];
          i++;
        }
        tokens.push({ type: 'IDENTIFIER', value: identifier });
        continue;
      }
      
      if (char === '"') {
        let str = '';
        i++; // skip the opening quote
        while (i < formula.length && formula[i] !== '"') {
          str += formula[i];
          i++;
        }
        i++; // skip the closing quote
        tokens.push({ type: 'STRING', value: str });
        continue;
      }

      throw new Error(`Unexpected character: ${char}`);
    }
    return tokens;
  }
}

// A simple parser to create a syntax tree from tokens.
class FormulaParser {
  private lexer = new FormulaLexer();
  
  parse(formula: string) {
    const tokens = this.lexer.tokenize(formula);
    return this.parseExpression(tokens);
  }

  private parseExpression(tokens: any[]) {
    let left = this.parseTerm(tokens);
    while (tokens.length > 0 && (tokens[0].type === 'PLUS' || tokens[0].type === 'MINUS')) {
      const operator = tokens.shift();
      const right = this.parseTerm(tokens);
      left = { type: 'binary', operator: operator.value, left, right };
    }
    return left;
  }

  private parseTerm(tokens: any[]) {
    let left = this.parseFactor(tokens);
    while (tokens.length > 0 && (tokens[0].type === 'MULTIPLY' || tokens[0].type === 'DIVIDE')) {
      const operator = tokens.shift();
      const right = this.parseFactor(tokens);
      left = { type: 'binary', operator: operator.value, left, right };
    }
    return left;
  }

  private parseFactor(tokens: any[]) {
    if (tokens.length === 0) throw new Error('Unexpected end of formula');
    const token = tokens.shift();

    switch (token.type) {
      case 'NUMBER':
        return { type: 'number', value: token.value };
      case 'STRING':
        return { type: 'string', value: token.value };
      case 'IDENTIFIER':
        if (tokens.length > 0 && tokens[0].type === 'LPAREN') {
          tokens.shift(); // Consume '('
          const args = this.parseArguments(tokens);
          if (tokens.length === 0 || tokens.shift().type !== 'RPAREN') {
            throw new Error('Missing closing parenthesis for function call');
          }
          return { type: 'function', name: token.value, arguments: args };
        }
        return { type: 'reference', name: token.value };
      case 'LPAREN':
        const expression = this.parseExpression(tokens);
        if (tokens.length === 0 || tokens.shift().type !== 'RPAREN') {
          throw new Error('Missing closing parenthesis');
        }
        return expression;
      default:
        throw new Error(`Unexpected token: ${token.type}`);
    }
  }

  private parseArguments(tokens: any[]) {
    const args = [];
    if (tokens.length > 0 && tokens[0].type === 'RPAREN') {
      return args;
    }
    args.push(this.parseExpression(tokens));
    while (tokens.length > 0 && tokens[0].type === 'COMMA') {
      tokens.shift(); // Consume ','
      args.push(this.parseExpression(tokens));
    }
    return args;
  }
}

// Dummy PAYE calculator for formula engine
class PAYECalculator {
    calculatePAYE(income: number, deductions: any = {}) {
        return { totalTax: income * 0.2 }; // Simplified logic
    }
}

// Dummy VAT calculator for formula engine
class VATCalculator {
    calculateVAT(amount: number, category: string = 'standard') {
        return { vatAmount: amount * 0.075 }; // Simplified logic
    }
}


export class FormulaEngine {
  private functions: { [key: string]: (...args: any[]) => any };
  private parser = new FormulaParser();

  constructor() {
    this.functions = this.registerFunctions();
  }

  private registerFunctions() {
    return {
      // Mathematical functions
      SUM: (...args: number[]) => args.flat().reduce((a, b) => a + b, 0),
      AVG: (...args: number[]) => args.flat().reduce((a, b) => a + b, 0) / args.flat().length,
      MAX: (...args: number[]) => Math.max(...args.flat()),
      MIN: (...args: number[]) => Math.min(...args.flat()),
      ROUND: (num: number, decimals: number) => Math.round(num * 10 ** decimals) / 10 ** decimals,
      
      // Financial functions
      NPV: (rate: number, ...cashflows: number[]) => {
        return cashflows.flat().reduce((acc, cashflow, index) => 
          acc + (cashflow / Math.pow(1 + rate, index + 1)), 0);
      },
      IRR: (values: number[], guess = 0.1) => {
        let rate = guess;
        for (let i = 0; i < 100; i++) {
          const npv = values.flat().reduce((acc, val, idx) => 
            acc + (val / Math.pow(1 + rate, idx)), 0);
          if (Math.abs(npv) < 0.0001) return rate;
          rate -= npv / 1000;
        }
        return rate;
      },
      
      // Tax-specific functions
      CALCULATE_PAYE: (income: number, deductions: any) => {
        const calculator = new PAYECalculator();
        return calculator.calculatePAYE(income, deductions).totalTax;
      },
      CALCULATE_VAT: (amount: number, category: string) => {
        const calculator = new VATCalculator();
        return calculator.calculateVAT(amount, category).vatAmount;
      }
    };
  }

  evaluate(expression: string, context: { [key: string]: any } = {}) {
    try {
      const parsed = this.parser.parse(expression);
      return this.evaluateNode(parsed, context);
    } catch (error: any) {
      throw new Error(`Formula error: ${error.message}`);
    }
  }

  private evaluateNode(node: any, context: { [key: string]: any }): any {
    switch (node.type) {
      case 'number':
        return parseFloat(node.value);
      case 'string':
        return node.value;
      case 'reference':
        return this.resolveReference(node.name, context);
      case 'function':
        const args = node.arguments.map((arg: any) => this.evaluateNode(arg, context));
        return this.executeFunction(node.name, args);
      case 'binary':
        const left = this.evaluateNode(node.left, context);
        const right = this.evaluateNode(node.right, context);
        return this.applyOperator(node.operator, left, right);
      default:
        throw new Error(`Unsupported node type: ${node.type}`);
    }
  }

  private resolveReference(name: string, context: { [key: string]: any }) {
    if (name in context) {
      return context[name];
    }
    throw new Error(`Reference error: ${name} is not defined`);
  }

  private executeFunction(name: string, args: any[]) {
    const func = this.functions[name.toUpperCase()];
    if (!func) {
      throw new Error(`Function ${name} not found`);
    }
    return func(...args);
  }

  private applyOperator(operator: string, left: any, right: any) {
    switch (operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }
}
