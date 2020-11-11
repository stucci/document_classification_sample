// [人工知能/機械学習： ベイジアンフィルタによるテクスト分類 - 文系プログラマー](https://uraway.hatenablog.com/entry/2016/04/18/153000)
// require: [MeCab： Yet Another Part-of-Speech and Morphological Analyzer](http://taku910.github.io/mecab/#install-windows)
// chcp 65001を実行すること。
const bayes = require('bayes');
const Mecab = require('mecab-async');
const mecab = new Mecab()

const nobunaga = '織田 信長（おだ のぶなが）は、戦国時代から安土桃山時代にかけての武将・戦国大名。三英傑の一人。尾張国（現在の愛知県）の古渡城主・織田信秀の嫡男[注釈 5]。 尾張守護代の織田氏の中でも庶流・弾正忠家の生まれであったが、父の代から主家の清洲織田氏（織田大和守家）や尾張守護の斯波氏をも凌ぐ力をつけ、家督争いの混乱を収めて尾張を統一し、桶狭間の戦いで今川義元を討ち取ると、婚姻による同盟策などを駆使しながら領土を拡大した。足利義昭を奉じて上洛すると、将軍、次いでは天皇の権威を利用して天下に号令。後には義昭を追放して室町幕府を事実上滅ぼし、畿内を中心に強力な中央集権的政権（織田政権）を確立して天下人となった。これによって他の有力な大名を抑えて戦国乱世の終焉に道筋をつけた。しかし天正10年6月2日（1582年6月21日）、重臣・明智光秀に謀反を起こされ、本能寺で自害した。すでに家督を譲っていた嫡男・織田信忠も同日に二条城で没し、信長の政権は、豊臣秀吉による豊臣政権、徳川家康が開いた江戸幕府へと引き継がれていくことになる。';
const mitsuhide = '明智 光秀（あけち みつひで）は、戦国時代から安土桃山時代にかけての武将。戦国大名・織田信長に見出されて重臣に取り立てられるが、本能寺の変を起こして信長を暗殺。直後に中国大返しにより戻った羽柴秀吉に山崎の戦いで敗れた。一説では、落ちていく途中、小栗栖において落ち武者狩りで殺害されたとも[注釈 4][6]致命傷を受けて自害したもとされる[7]。これは光秀が信長を討って天下人になってからわずか13日後のことであり、その短い治世は「三日天下」とも言う。本姓は源氏で、家系は清和源氏の摂津源氏系で、美濃源氏土岐氏支流である明智氏。通称は十兵衛。雅号は咲庵（しょうあん）。のちに朝廷より惟任の姓を賜ったため惟任光秀とも言う。妻は妻木煕子。その間には、細川忠興室・珠（洗礼名：ガラシャ）、嫡男・光慶（十五郎）、津田信澄室がいる。領地では善政を行ったとされ、忌日に祭事を伝える地域（光秀公正辰祭・御霊神社 (福知山市)）もある。後世、江戸時代の文楽「絵本太功記」や歌舞伎「時桔梗出世請状」をはじめ、小説・映画・テレビドラマなどでもその人物がとりあげられている。';
const hideyoshi = '豊臣秀吉（とよとみ ひでよし、とよとみ の ひでよし、旧字体: 豐臣秀吉）、または羽柴 秀吉（はしば ひでよし）は、戦国時代から安土桃山時代にかけての武将、大名、天下人、関白、太政大臣、太閤。三英傑の一人[1][2]。初め木下氏を名字とし、羽柴氏に改める。本姓としては、初め平氏を自称するが、近衛家の猶子となり藤原氏に改姓した後、豊臣氏に改めた。尾張国愛知郡中村郷の下層民の家に生まれたとされる。（出自参照）当初、今川家に仕えるも出奔した後に織田信長に仕官し、次第に頭角を現した。信長が本能寺の変で明智光秀に討たれると「中国大返し」により京へと戻り山崎の戦いで光秀を破った後、信長の孫・三法師を擁して織田家内部の勢力争いに勝ち、信長の後継の地位を得た。大坂城を築き、関白・太政大臣に就任し、豊臣姓を賜り、日本全国の大名を臣従させて天下統一を果たした。天下統一後は太閤検地や刀狩令、惣無事令、石高制などの全国に及ぶ多くの政策で国内の統合を進めた。理由は諸説あるが明の征服を決意して朝鮮に出兵した文禄・慶長の役の最中に、嗣子の秀頼を徳川家康ら五大老に託して病没した。秀吉の死後に台頭した徳川家康が関ヶ原の戦いで勝利して天下を掌握し、豊臣家は凋落。慶長19年（1614年）から同20年（1615年）の大坂の陣で豊臣家は江戸幕府に滅ぼされた。墨俣の一夜城、金ヶ崎の退き口、高松城の水攻め、中国大返し、石垣山一夜城などが、機知に富んだ功名立志伝として広く親しまれ、百姓から天下人へと至った生涯は「戦国一の出世頭」と評される。';

const classifier = bayes({
  tokenizer: function(text) {
    const wakached = mecab.wakachiSync(text);
    console.log(wakached)
    return wakached;
  }
});

// 学習
classifier.learn(nobunaga, '織田信長');
classifier.learn(mitsuhide, '明智光秀');
classifier.learn(hideyoshi, '豊臣秀吉');

// 与えられたテキストデータのカテゴリを予想
categorize('部下に謀反を起こされる');
categorize('三日天下');
categorize('下層農民の生まれ');

async function categorize(text) {
  const r = await classifier.categorize(text);
  console.log("[" + r + "] - " + text);
}

// setTimeout(()=>{
//   console.log(classifier.wordFrequencyCount)
//   console.log(JSON.stringify(JSON.parse(classifier.toJson()), null, '\t'))
//   console.log(classifier.vocabulary)
//   console.log(classifier.totalDocuments)
//   console.log(classifier.docCount)
//   console.log(classifier.categories)
// }, 1000)
