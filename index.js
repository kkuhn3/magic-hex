let canvas;
let ctx;
let r;
let draggedIndex = undefined;

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	r = 75;

	canvas.onmousedown = function(e){
		draggedIndex = calcIndex(e);
	}
	canvas.onmouseup = function(e){
		if (draggedIndex != undefined) {
			hoveredIndex = calcIndex(e);
			if (hoveredIndex != undefined) {
				[gridArray[draggedIndex], gridArray[hoveredIndex]] = [gridArray[hoveredIndex], gridArray[draggedIndex]];
				redraw();
				draggedIndex = undefined;
			}
		}
	}

	canvas.onmousemove = function(e){
		if (draggedIndex != undefined) {
			redraw();
			ctx.fillStyle="#000000";
			drawHexagon(e.x*1.1, e.y*1.65, r);
			ctx.fillText(gridArray[draggedIndex], e.x*1.1 - .25 * r, e.y*1.65 + .25 * r);
		}
	}
}

function redraw() {
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle="#000000";
	drawGrid();
	reDrawNumbers();
}

function drawGrid() {
	for (let i = 0; i < 3; i++) {
		drawHexagon(2 * i * r + 3 * r, 1 * r, r);
	}
	for (let i = 0; i < 4; i++) {
		drawHexagon(2 * i * r + 2 * r, 3 * r, r);
	}
	for (let i = 0; i < 5; i++) {
		drawHexagon(2 * i * r + 1 * r, 5 * r, r);
	}
	for (let i = 0; i < 4; i++) {
		drawHexagon(2 * i * r + 2 * r, 7 * r, r);
	}
	for (let i = 0; i < 3; i++) {
		drawHexagon(2 * i * r + 3 * r, 9 * r, r);
	}
}

function drawHexagon(x, y, r) {
	const a = 2 * Math.PI / 6;
	ctx.beginPath();
	for (let i = 0; i < 6; i++) {
		ctx.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i));
	}
	ctx.closePath();
	ctx.stroke();
}

let gridArray = [];
function populateGrid() {
	gridArray = [];
	for (let i = 0; i < 19; i++) {
		gridArray.push(i + 1);
	}
}

function reDrawNumbers() {
	ctx.font = "64px serif";
	for (let i = 0; i < 3; i++) {
  	ctx.fillText(gridArray[0+i], 137.5 * i + 213, 98);
	}
	for (let i = 0; i < 4; i++) {
		ctx.fillText(gridArray[3+i], 137.5 * i + 145.5, 245);
	}
	for (let i = 0; i < 5; i++) {
		ctx.fillText(gridArray[7+i], 137.5 * i + 75.5, 392);
	}
	for (let i = 0; i < 4; i++) {
		ctx.fillText(gridArray[12+i], 137.5 * i + 145.5, 539);
	}
	for (let i = 0; i < 3; i++) {
		ctx.fillText(gridArray[16+i], 137.5 * i + 213, 686);
	}
	reDrawMath();
}

function reDrawMath() {
	// -
	let val = gridArray[0] + gridArray[1] + gridArray[2];
	chooseColor(val);
	ctx.fillText(val, 550+50, 98);

	val = gridArray[3] + gridArray[4] + gridArray[5] + gridArray[6];
	chooseColor(val);
	ctx.fillText(val, 620+50, 245);

	val = gridArray[7] + gridArray[8] + gridArray[9] + gridArray[10] + gridArray[11];
	chooseColor(val);
	ctx.fillText(val, 687.5+50, 392);

	val = gridArray[12] + gridArray[13] + gridArray[14] + gridArray[15];
	chooseColor(val);
	ctx.fillText(val, 620+50, 539);

	val = gridArray[16] + gridArray[17] + gridArray[18];
	chooseColor(val);
	ctx.fillText(val, 550+50, 686);

	// \
	val = gridArray[2] + gridArray[6] + gridArray[11];
	chooseColor(val);
	ctx.fillText(val, 687.5, 392+80);

	val = gridArray[1] + gridArray[5] + gridArray[10] + gridArray[15];
	chooseColor(val);
	ctx.fillText(val, 620, 539+80);

	val = gridArray[0] + gridArray[4] + gridArray[9] + gridArray[14] + gridArray[18];
	chooseColor(val);
	ctx.fillText(val, 550, 686+80);

	val = gridArray[3] + gridArray[8] + gridArray[13] + gridArray[17];
	chooseColor(val);
	ctx.fillText(val, 292.5+100, 686+80);

	val = gridArray[7] + gridArray[12] + gridArray[16];
	chooseColor(val);
	ctx.fillText(val, 155+62.5, 686+80);

	// /
	val = gridArray[7] + gridArray[3] + gridArray[0];
	chooseColor(val);
	ctx.fillText(val, 0, 392+80);

	val = gridArray[12] + gridArray[8] + gridArray[4] + gridArray[1];
	chooseColor(val);
	ctx.fillText(val, 70, 539+80);

	val = gridArray[16] + gridArray[13] + gridArray[9] + gridArray[5] + gridArray[2];
	chooseColor(val);
	ctx.fillText(val, 155 - 17.5, 686+80);

	val = gridArray[17] + gridArray[14] + gridArray[10] + gridArray[6];
	chooseColor(val);
	ctx.fillText(val, 292.5+17.5, 686+80);

	val = gridArray[18] + gridArray[15] + gridArray[11];
	chooseColor(val);
	ctx.fillText(val, 430+35, 686+80);
}

function chooseColor(val) {
	if (val == 38) {
		ctx.fillStyle = "green";
	}
	else {
		ctx.fillStyle = "red";
	}
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

function calcIndex(e) {
	if (e.y < 98) {
		if (e.x < 275 && e.x > 155) {
			return 0;
		}
		if (e.x < 412.5 && e.x > 292.5) {
			return 1;
		}
		if (e.x < 550 && e.x > 430) {
			return 2;
		}
	}
	if (e.y < 188) {
		if (e.x < 207.5 && e.x > 87.5) {
			return 3;
		}
		if (e.x < 345 && e.x > 225) {
			return 4;
		}
		if (e.x < 482.5 && e.x > 362.5) {
			return 5;
		}
		if (e.x < 620 && e.x > 500) {
			return 6;
		}
	}
	if (e.y < 278) {
		if (e.x < 137.5 && e.x > 17.5) {
			return 7;
		}
		if (e.x < 275 && e.x > 155) {
			return 8;
		}
		if (e.x < 412.5 && e.x > 292.5) {
			return 9;
		}
		if (e.x < 550 && e.x > 430) {
			return 10;
		}
		if (e.x < 687.5 && e.x > 567.5) {
			return 11;
		}
	}
	if (e.y < 368) {
		if (e.x < 207.5 && e.x > 87.5) {
			return 12;
		}
		if (e.x < 345 && e.x > 225) {
			return 13;
		}
		if (e.x < 482.5 && e.x > 362.5) {
			return 14;
		}
		if (e.x < 620 && e.x > 500) {
			return 15;
		}
	}
	if (e.y < 458) {
		if (e.x < 275 && e.x > 155) {
			return 16;
		}
		if (e.x < 412.5 && e.x > 292.5) {
			return 17;
		}
		if (e.x < 550 && e.x > 430) {
			return 18;
		}
	}
}
//  a b c
// d e f g
//h i j k l
// m n o p
//  q r s

function solve() {
	let aList = [];
	for (let i = 1; i < 20; i++) {
		aList.push(i);
	}
	shuffle(aList);
	//a
	for (let ai = 0; ai < aList.length; ai++) {
		const a = aList[ai];
		//b
		const bList = [...aList];
		bList.splice(ai, 1);
		for (let bi = 0; bi < bList.length; bi++) {
			const b = bList[bi];
			//c
			const cList = [...bList];
			cList.splice(bi, 1);
			const c = 38 - a - b;
			const ci = cList.indexOf(c);
			if (ci > -1) {
				//d
				const dList = [...cList];
				dList.splice(ci, 1);
				for (let di = 0; di < dList.length; di++) {
					const d = dList[di];
					//h
					const hList = [...dList];
					hList.splice(di, 1);
					const h = 38 - a - d;
					const hi = hList.indexOf(h);
					if (hi > -1) {
						//m
						const mList = [...hList];
						mList.splice(hi, 1);
						for (let mi = 0; mi < mList.length; mi++) {
							const m = mList[mi];
							//q
							const qList = [...mList];
							qList.splice(mi, 1);
							const q = 38 - h - m;
							const qi = qList.indexOf(q);
							if (qi > -1) {
								//r
								const rList = [...qList];
								rList.splice(qi, 1);
								for (let ri = 0; ri < rList.length; ri++) {
									const r = rList[ri];
									//s
									const sList = [...rList];
									sList.splice(ri, 1);
									const s = 38 - q - r;
									const si = sList.indexOf(s);
									if (si > -1) {
										//p
										const pList = [...sList];
										pList.splice(si, 1);
										for (let pi = 0; pi < pList.length; pi++) {
											const p = pList[pi];
											//l
											const lList = [...pList];
											lList.splice(pi, 1);
											const l = 38 - p - s;
											const li = lList.indexOf(l);
											if (li > -1) {
												//g
												const gList = [...lList];
												gList.splice(li, 1);
												const g = 38 - l - c;
												const gi = gList.indexOf(g);
												if (gi > -1) {
													//f
													const fList = [...gList];
													fList.splice(gi, 1);
													for (let fi = 0; fi < fList.length; fi++) {
														const f = fList[fi];
														//e
														const eList = [...fList];
														eList.splice(fi, 1);
														const e = 38 - d - f - g;
														const ei = eList.indexOf(e);
														if (ei > -1) {
															//i
															const iList = [...eList];
															iList.splice(ei, 1);
															const i = 38 - b - e - m;
															const ii = iList.indexOf(i);
															if (ii > -1) {
																//n
																const nList = [...iList];
																nList.splice(ii, 1);
																const n = 38 - d - i - r;
																const ni = nList.indexOf(n);
																if (ni > -1) {
																	//o
																	const oList = [...nList];
																	oList.splice(ni, 1);
																	const o = 38 - m - n - p;
																	const oi = oList.indexOf(o);
																	if (oi > -1) {
																		//k
																		const kList = [...oList];
																		kList.splice(oi, 1);
																		const k = 38 - r - o - g;
																		const ki = kList.indexOf(k);
																		if (ki > -1) {
																			//j
																			const jList = [...kList];
																			jList.splice(ki, 1);
																			const j = 38 - h - i - k - l;
																			const ji = jList.indexOf(j);
																			if (ji > -1) {
																				console.log("Success");
																				gridArray[0] = a;
																				gridArray[1] = b;
																				gridArray[2] = c;
																				gridArray[3] = d;
																				gridArray[4] = e;
																				gridArray[5] = f;
																				gridArray[6] = g;
																				gridArray[7] = h;
																				gridArray[8] = i;
																				gridArray[9] = j;
																				gridArray[10] = k;
																				gridArray[11] = l;
																				gridArray[12] = m;
																				gridArray[13] = n;
																				gridArray[14] = o;
																				gridArray[15] = p;
																				gridArray[16] = q;
																				gridArray[17] = r;
																				gridArray[18] = s;
																				return;
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
