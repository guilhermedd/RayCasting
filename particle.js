class Particle {
    constructor(pos, num_rays, width) {
        this.pos = pos;
        this.width = width;
        this.rays = [];
        for (let i = -30; i < 100; i += 360 / num_rays) {
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
        return closest;
    }

    look(walls) {
        let pts = [];
        let rays = [];
        for (let ray of this.rays) {
            for (let i = 0; i < walls.length; i++) {
                pts[i] = ray.intersect(walls[i]);
            }
            rays.push(this.show_closest(ray, pts));
        }
        return rays;
    }

    render_rays() {
        let rays = this.look(barriers);
        let size_of_ray = this.width / rays.length;
        for (let i = 0; i < rays.length; i++) {
            rectMode(CENTER);
            let dist = 0
            // get the distance from the ray to the particle
            if (rays[i] == null) {
                console.log("null")
                dist = this.width / 2
            } else {
                dist = this.pos.dist(createVector(rays[i].x, rays[i].y));
            }
            let filling = map(dist, 0, this.width / 2, 255, 0);
            fill(filling);
            noStroke();
            // draw the rectangle for each ray and fill it with the distance
            let height = map(dist, 0, this.width / 2, this.width, 0);
            rect(this.width + size_of_ray * i + size_of_ray/2, this.width / 2, size_of_ray + 1, height);
        }
    }
}