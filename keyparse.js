function loadKeySprites() {
    emojiBet = {
        a: loadImage("./keys/a.png"),
        b: loadImage("./keys/b.png"),
        c: loadImage("./keys/c.png"),
        d: loadImage("./keys/d.png"),
        e: loadImage("./keys/e.png"),
        f: loadImage("./keys/f.png"),
        g: loadImage("./keys/g.png"),
        h: loadImage("./keys/h.png"),
        i: loadImage("./keys/i.png"),
        j: loadImage("./keys/j.png"),
        k: loadImage("./keys/k.png"),
        l: loadImage("./keys/l.png"),
        m: loadImage("./keys/m.png"),
        n: loadImage("./keys/n.png"),
        o: loadImage("./keys/o.png"),
        p: loadImage("./keys/p.png"),
        q: loadImage("./keys/q.png"),
        r: loadImage("./keys/r.png"),
        s: loadImage("./keys/s.png"),
        t: loadImage("./keys/t.png"),
        u: loadImage("./keys/u.png"),
        v: loadImage("./keys/v.png"),
        w: loadImage("./keys/w.png"),
        x: loadImage("./keys/x.png"),
        y: loadImage("./keys/y.png"),
        z: loadImage("./keys/z.png")
    };
}

/**
 * 
 * @param {String} text 
 * @param {Number} startX 
 * @param {Number} startY 
 * @param {Number} textSize 
 */
function printEmojiText(text, startX, startY, textSize = 50) {
    for (let i = 0; i < text.length; i++){
        if (text.charAt(i) != " "){
            image(emojiBet[text.charAt(i).toLowerCase()], startX + (i * textSize), startY, textSize, textSize);
        }
    }
}