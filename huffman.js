inputData = 'abrakadabra';
function Node(letter, freq, used,code,father,right,left,index){
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.code = code;
    this.father = father;
    this.right = right;
    this.left = left;
    this.index = index;
}
let tree = new Array();
let alph = new Array();
for (let i = 0; i < inputData.length; i++){
    alph[inputData.charAt(i)] = 0;
}
for (let i = 0; i < inputData.length; i++){
    alph[inputData.charAt(i)]++;
}
for (let i in alph){
    let n = new Node(i, alph[i], false, '', null, null, null, null);
    n.index=tree.length;
    tree.push(n)
}
let long = tree.length;
function findMin1(Tree){
    let min1 = Number.POSITIVE_INFINITY;
    let minOne;
    for (let i = 0; i < tree.length; i++){
        if (tree[i].used == false && tree[i].freq < min1){
            min1 = tree[i].freq;
            minOne=tree[i];
        }
    }
    minOne.used = true;
    return minOne;
}
function findMin2(Tree){
    let min2 = Number.POSITIVE_INFINITY;
    let minTwo
    for (let i = 0; i < tree.length; i++){
        if (tree[i].used == false && tree[i].freq < min2){
            min2 = tree[i].freq;
            minTwo=tree[i];
        }
    }
    minTwo.used = true;
    return minTwo;
}
for (let i = 0 ; i < long-1; i++) {
    let a = findMin1(tree)
    let b = findMin2(tree)
    let newNode = new Node(a.letter + b.letter, a.freq + b.freq, false, '', null, b.index, a.index, tree.length)
    a.father = newNode.index;
    b.father = newNode.index;
    a.code = '0'
    b.code = '1'
    tree.push(newNode);
}
let coded = [];
for (let i = 0; i < long; i++) {
    let num = i;
    coded[tree[num].letter] = '';
    while (tree[num].father != null) {
        coded[tree[i].letter] = tree[num].code + coded[tree[i].letter];
        num = tree[num].father;
 
    }
}
let codeLine = '';
for (let i = 0; i < inputData.length; i++) {
    let j = inputData[i];
    codeLine += coded[j];
}
 
function DecodeLine(str, Tree, base) {
    let decoded = ''
    let root = base
    for (i = 0; i < str.length; i++) {
        if (str[i] === "0") {
            root = Tree[root.left]
        }
        if (str[i] === '1') {
            root = Tree[root.right]
        }
        if (root.left === null && root.right === null) {
            decoded += root.letter
            root = base
        }
    }
    return decoded;
}
console.log(coded)
console.log(codeLine)
console.log(DecodeLine(codeLine,tree,tree[tree.length-1]))