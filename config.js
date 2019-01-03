/*
  A switch for the mode of the webpage.
*/
var MODE="hat";

/*
  A switch for if Google Earth images are enabled.
*/
var ENABLE_GOOGLE_EARTH = true;

/*
  This is the list of quotes used by this program.
  Put one (and only one) quote on each line.
  Don't put quotes outside of the tick marks (` `).
*/
var RAW_QUOTE_STRING = `
Those who matter don't mind, and those that mind don't matter.
Be the energy you want to attract.
Difficult roads lead to beautiful destinations.
When you can't find the sunshine, be the sunshine.
Life is a series of a thousand tiny miracles. Notice and cherish them.
A winner is just a loser that tried one more time.
Wake up each morning with the thought that something wonderful is about to happen.
Learn from yesterday, live for today and hope for tomorrow.
Strive for progress, not perfection.
Keep your face to the sunshine and you cannot see a shadow.
Nothing can dim the light that shines from within.
Start each day with a grateful heart.
When in doubt, be kind.
Everyone shines, given the right lighting.
Love life and it will love you right back.
With the new day comes new strength and new thoughts.
You never know when the best day of your life is going to be.
Sometimes when things are falling apart, they may actually be falling into place.
When life takes away, something of greater value is always given in return.
The one who falls and gets up is so much stronger than the one who never fell.
We may encounter many defeats but we must not be defeated.
Believe you can and you're halfway there.
Yesterday is not ours to recover, but tomorrow is ours to win or lose.
Turn your face to the sun and the shadow falls behind you.
The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.
Practice like you've never won; perform like you've never lost.
If you can't stop thinking about it, don't stop working for it.
Whether you think you can or you think you can't, you're right.
Perfection is not attainable, but if we chase perfection we can catch excellence.
Life is 10% what happens to me and 90% of how I react to it.
Proceed in life as if you're going to succeed.
If your heart is broken, make art with the pieces.
I know nothing, but I am here to learn.
If you can't see anything beautiful about yourself, get a better mirror, look a little closer, stare a little longer.
`;

/*
  This is a list of 4-digit Google Earth image IDs, with newlines every 20 IDs.
*/
var RAW_GOOGLE_EARTH_STRING = `
10031004100610071008101010121014101710181019102110221023102410261027103210331034
10351036103710381039104010411046104710481049105010521053105410551056105710631064
10651066106710681069107010711074107510771078108010811082108410851086108710891091
10921093109410951096109710981099110111021103110411051107110911101114111511161118
11191121112211231125112711281131113211331134113511381139114011411143114711481151
11521154115511561157115811591160116111631164116511661167116811691170117211731174
11761177117811801181118311841186119011911192119511961197119811991206120712091211
12121215121612171206120712091211121212151216121712211222122412251226122912301231
12331237123812391240124112421243124512471248125112531254125512561257125812591260
12651267126812691270127312741277128012821285128612871289129012921293129712981300
13011302130813091312131613171323132413251326132913321336133713381341134213431345
13481349135013511352135313561358135913631364136813691370137113731374137513771378
13811383138513881393139413961397139813991402140314061407140814091413141414161417
14181419142014211423142714291430143214341435143614371438144014431444144614471448
14491450145114561457146314641466146814701471147214741475147614771478148414851487
14881490149114921494149514961498150015011502150515061508150915101511151215141515
15161517151815191521152315251526152715281529153015311534153715381539154015411542
15431544154515461548155015511553155615571558155915601561156315651567156815691572
15741578157915821583158415851588158915911594159515981606160716081609161016111612
16131614161516171618162016231626162816291630163416361637163916401641164316441645
16461648165216531655165716601661166216631664166616681669167216731674167516761681
16831684168516861687168816891690169216941695169716981699170117021703170417071710
17111712171317141716171817191720172117221724172517271728172917301731173217341735
17371738173917401741174217461750175417561758175917601761176217631766176717681770
17711772177417751776177717781779178017821783178417851786178717881790179217931796
17971799180118041805180618071808180918101811181218161817182018211822182318241825
18261828182918311832183318341835183618371838183918401841184218431844184518461849
18521853185418551857185818591860186118631864186818701872187318751883188418851887
18881889189018911893189418971901190219031904190519071908190919101911191219131915
19191920192119221923192419251926192719341935193619371938193919401942194319451946
19471948194919511952195419551956195719591960196119621964196519661967196819691970
19711972197319741975197619771978197919801981198219831984198619871989199019911992
19931994199519981999200120022003200720092010201120122013201420152016201720182021
20222023202420252026202720282029203020312032203320342035203620372038203920402041
20422043204420452046204720482049205020512052205420552056205720582059206020612062
20632064206520662067206820692070207220742075207620782081208220832084208820912093
20952096209720982100210221032109211221132116211821202121212421252126213121322135
21372138213921402141214221452147214821492150215121522154215621572159216021612162
21652166216721682169217021712175217621772179218021812182218321862187218821902191
21922194219521972198219922022203220422052206220722092211221222132216221822202222
22232224222722282229223022312237223922402241224322442246224722482249225122522253
22562258225922602263226422652266226822692270227222732274227522762277227822802281
22842287228822902291229222932294229522962303230423052307230823112312231323142315
23162317231823192321232223232324232523262327232923302331233223332334233723402341
23422343234423452346234723502357236023612364236723682371237223742375237723782379
23802381238223832385238623882389239023912392239323952397239823992401240224032405
24062407240824092410241124122413241424162418241924212422242324262430243124322433
24342435243624372438243924422443244424462447244850035004500550075008501250155016
50195022502350275028503550375038503950405041504350445045504650475048505150525053
50565057506050625063506450655066507150725073507650775078507950805081508250975103
51045105511151215126514751635164516551675168517251735178517951815182518351885189
51925198519952065207521552165217522852315234523752385242524352445245525352545255
52905296530253045310531453195325532953305333533453385355536153655375538253895396
54035412542254235424542554265438544554515452545454565457546054615462546454745477
54785479548054815484548554875502550855115513552755285529553055315533553655385542
55515553555555565560556255635564556555695575557755835584558655875588558955915594
55955596560456075609561156125614561656175618561956205624562656285629563056345635
56365641564656515653565456605663566656685674567556765686568856895692570557205723
57245729574157445749575557615762576357665767577057735778578657875790579257955796
57975809581058185822582858295836585558595862586458705874588258845890589859015924
59335938594159445945595159525954595559575958595959605964597559775978597959815982
59845989599259955999599960016002600360046005600660076008601160136014601560166017
60186019602260256032604160436044604560466048604960506051605260536054605560566057
60596060606260636065606660686069607060726073607460786079608060816082609560966097
60996100610161026103610561076108610961106112611461166117611961206121612261246125
61346135613661376138613961406141614361446146614961506151615261536155616061616167
61706175617661776178618061816182618361846186618761896201620262046205620662076208
62096210621162136215621662176218622262286229623062316232623362346235624162446248
62546255625662576258625962606262626362646265626662676269627162726275627662796280
62816282628362846285628762906291629262936294629562966298630063016302630363046311
63136315631663176318631963206321632463256326633963406341634263446345634663476348
63496350635163526355635663586359636063616362636363646365636663676368637163726374
63756376637763786379638063816382638363846386638763886389640264096410642464356436
64416443645764596460646564706473648864916495649664986500650365046510651265196524
65256527652865316543654565616565656665756578657965876588658965906600660770017002
70037004700570067007700870097010701170127013701570167017701870197020702170227023
`;
