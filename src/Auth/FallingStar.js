import { useState } from "react";
import { useEffect } from "react";
import FallingStarPoint from "./FallingStarPoint";

function FallingStar() {
    const [dimension, updateDimention] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    useEffect(() => {
        window.addEventListener("resize", () => {
            updateDimention({
                width: window.innerWidth,
                height: window.innerHeight
            });
        })
        updateDimention({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, []);

    function initPos() {
        if (dimension) {
            return { x: Math.random() * dimension.width, y: Math.random() * dimension.height }
        } else {
            return { x: 0, y: 0 };
        }
    }

    function initAllPos() {
        let poses = [];
        for (let i = 0; i < 8; i++) {
            poses.push(initPos());
        }
        return poses;
    }

    const [pos, setPos] = useState(initAllPos());

    function initPoints() {
        const pts = [];
        for (let i = 0; i < 8; i++) {
            pts.push(
                <FallingStarPoint key={i} index={i} pos={pos} />
            );
        }
        return pts;
    }

    const points = initPoints();

    useEffect(() => {
        const interval = setInterval(() => {
            let newPos = initAllPos();
            for (let i = 1; i < 8; i++) {
                newPos[i] = pos[i - 1];
            }
            newPos[0] = {
                x: pos[0].x + 1 + Math.random(),
                y: pos[0].y + 2 + Math.random()
            }

            let lastPos = newPos[newPos.length - 1];
            if (lastPos.x > dimension.width || lastPos.y > dimension.height) {
                let top = Math.random() >= 0.5;
                if (top) {
                    newPos[0].y = -5;
                    newPos[0].x = Math.random() * dimension.width;
                } else {
                    newPos[0].x = -5;
                    newPos[0].y = Math.random() * dimension.height;
                }
            }
            setPos(newPos);
        }, 40);
        return () => clearInterval(interval);
    })

    return (
        <div style={{
            width: '100vw',
            height: '100vh', 
            top: 0, 
            left: 0,
            position: "fixed",
            opacity: .5
        }}>
            {points}
        </div>
    );
}

export default FallingStar;