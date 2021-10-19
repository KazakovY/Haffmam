inputData = 'abrakadabra';
let fs = require('fs');
let arg = process.argv;

function Node(letter, freq, used, child, code) {
this.letter = letter;
this.freq = freq;
this.used = used;
this.child = child;
this.code = code;
}


let alph = new Array();

let examAlph = new Array();
let tree = new Array();

let codeDict = Object;


for (let i = 0; i < inputData.length; i++) {
alph[inputData.charAt(i)] = 0;
}
for (let i = 0; i < inputData.length; i++) {
alph[inputData.charAt(i)]++;
}


for (let i in alph) {
let n = new Node(i, alph[i], false, null, null, '');
tree.push(n);
}


function findLowesFreq() {
let min = 9999;
let ind;
let lett

for (let i in tree) {
if (tree[i].freq < min && !examAlph.includes(tree[i].letter)) {
ind = i;
lett = tree[i].letter
}
}

examAlph.push(lett)

return ind;
}

while (tree.length > 1) {
let low1 = findLowesFreq();
let low2 = findLowesFreq();

tree[low1].code = '1';
tree[low2].code = '0';

let children = Array();

children.push(tree[low1]);
children.push(tree[low2]);

let n = new Node(tree[low1].letter + tree[low2].letter, tree[low1].freq + tree[low2].freq, false, children, '');
tree.push(n);

tree.splice(low1, 1);
tree.splice(low2, 1);


}
function findChild(node, letter) {
	if (node.letter == letter) {
		return node.code;
}
	for (let i in node.child) {
		if (node.child[i].letter.includes(letter)) {
			return findChild(node.child[i], letter) + node.code;
		}
	}
}

for (i in tree[0].letter) {
let sures = findChild(tree[0], tree[0].letter[i])

let res = '';

for (let i = sures.length-1; i >= 0;i--){
res += sures[i];
}

codeDict[tree[0].letter[i]] = res;
}

let result = '';

for (i in inputData){
result += codeDict[inputData[i]] + ' '
}
console.log(result);
function decode(){
let codes = result.split(" ");
let dicodedLine = "";
	for (i in codes){
		for (j in codeDict){
			if (codeDict[j] == codes[i]){
				dicodedLine += j;	
			}
	}
	}

console.log(dicodedLine);
}
decode();