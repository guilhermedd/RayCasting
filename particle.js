class Particle {
    constructor(pos) {
        this.pos = pos;
        this.rays = [];
        for (let i = 0; i < 360; i += 0.1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    show() {
        push()
        translate(this.pos.x, this.pos.y)
        fill(255);
        ellipse(0, 0, 16, 16);
        pop();
        for (let ray of this.rays) {
            ray.show();
        }
    }

    get_closer(main, list) {
        // In a line, returns the closest point to the source
        if (list.length == 1) return list[0]
        let closest = list[0]
        for (let i = 0; i < list.length; i++) {
            if (!list[i] || !closest) {
                continue
            }
            if (main.dist(list[i]) < main.dist(closest)) {
                closest = list[i]
            }
        }
        return closest
    }

    show_closest(ray, spots) {
        let exists = [];
        for (let j = 0; j < spots.length; j++) {
            if (spots[j]) {
                exists.push(spots[j]);
            }
        }

        let closest = this.get_closer(ray.pos, exists)

        if (closest) {
            fill(255);
            line(ray.pos.x, ray.pos.y, closest.x, closest.y);
        }
    }

    look(walls) {
        let pts = [];
        for (let ray of this.rays) {
            for (let i = 0; i < walls.length; i++) {
                pts[i] = ray.intersect(walls[i]);
            }
            this.show_closest(ray, pts);
        }
    }
}