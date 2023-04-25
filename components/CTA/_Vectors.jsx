import { useEffect, useState, useRef } from "react";
import styles from "@/styles/cta.module.scss";

const Sketch = async (p) => {
  var cols;
  var rows;
  var resX;
  var resY;
  var phi;
  var goldenRatio;
  var dphi;
  var gamma;
  var lineX;
  var color = "#635bff";
  var background = "#eceff2";
  var margin = 10;

  function hexToRGB(h) {
    let r = 0,
      g = 0,
      b = 0;

    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    return { r, g, b };
  }

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);

    var resolution =
      ((window.innerWidth - margin * 2) * 1.0) /
      ((window.innerHeight - margin * 2) * 1.0);

    cols = 50;
    rows = Math.round(cols / resolution);
    resX = (window.innerWidth - margin * 2) / cols;
    resY = (window.innerHeight - margin * 2) / rows;
    lineX = resX / 2;
    phi = 0;
    gamma = 0;
    goldenRatio = 1 + p.sqrt(5) / 2;
    dphi = (p.TWO_PI / window.innerHeight) * resX;
  };

  p.draw = () => {
    const colorRGB = hexToRGB(color);
    const backgroundRGB = hexToRGB(background);

    p.background(backgroundRGB.r, backgroundRGB.g, backgroundRGB.b);
    p.rectMode(p.CENTER);

    phi += goldenRatio * 0.02;
    var theta = phi;
    for (var i = 0; i < cols; i++) {
      var imat = p.norm(i, 0, cols) * p.PI;
      for (var j = 0; j < rows; j++) {
        var jmat = p.norm(j, 0, rows) * p.PI;
        var beta = p.sin(theta);
        var inc = beta * resY * 0.25;
        theta += 0.0045;
        var x = margin + i * resX + resX / 2;
        var y = margin + j * resY + resY / 2 + inc;
        var hue = p.noise(i * 0.1, j * 0.1, p.frameCount * 0.01);

        p.push();
        p.translate(x, y);
        p.rotate(jmat + imat + gamma);
        p.noStroke();
        p.fill(colorRGB.r, colorRGB.g, colorRGB.b);
        p.alpha(p.pow(hue, 20));
        p.rect(0, 0, lineX, p.pow(hue, 2.5) * 3);
        p.pop();
      }
    }
    gamma += 0.01;
  };
};

const Vectors = () => {
  const ref = useRef(null);
  const [set, getSet] = useState(false);

  useEffect(() => {
    if (!set) setup();
  }, [set]);

  async function setup() {
    getSet(true);
    const p5 = (await import("p5")).default;
    new p5(Sketch, ref.current);
  }

  return (
    <div ref={ref} className={styles.canvas} />
  );
};

export default Vectors;
