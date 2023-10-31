class Particle {
    constructor(pos, num_rays, width, height) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.offset = 0;
        this.fov = 45;
        this.rays = [];
        for (let i = -this.fov/2; i < this.fov/2; i += 1) {
            this.rays.push(new Ray(this.pos, radians(i)));
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

    rotate(angle) {
        this.offset += angle;
        for (let i = 0; i < this.rays.length; i++) {
            if (this.rays[i].getAngle()) {
                this.rays[i].setAngle(this.rays[i].getAngle() + angle);
            }
        }
    }

    walk() {
        //walk to the pace im looking at
        const dir = p5.Vector.fromAngle(this.offset);
        dir.setMag(vel);
        if (keyIsDown(LEFT_ARROW)) {
            this.rotate(-0.03);
        } if (keyIsDown(RIGHT_ARROW)) {
            this.rotate(0.03);
        } if (keyIsDown(UP_ARROW)) {
            this.pos.add(dir);
        } if (keyIsDown(DOWN_ARROW)) {
            this.pos.sub(dir);
        }
    }

    look(walls) {
        this.walk();
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
        const rays = this.look(barriers);
        const size_of_ray = this.width / rays.length;

        for (let i = 0; i < rays.length; i++) {
            rectMode(CENTER);
            let dist = 0

            // get the distance from the ray to the particle
            // if the ray exists, otherwise set the distance to inf
            if (rays[i] == null) {
                dist = this.width
            } else {
                dist = this.pos.dist(createVector(rays[i].x, rays[i].y));
            }

            // Use the sqared distance to get a better gradient
            const dsq = dist * dist;
            const wsq = this.width * this.width;
            const filling = map(dsq, 0, wsq, 255, 0);
            const height = map(dist, 0, this.width, this.height, 0);

            fill(filling);
            noStroke();

            // draw the rectangle for each ray and fill it with the distance
            rect(this.width + size_of_ray * i + size_of_ray / 2, this.width / 2, size_of_ray + 1, height);
        }
    }
}