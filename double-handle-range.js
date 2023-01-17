class MultiRange {
    inputs = {
        range: {},
        number: {}
    };
    visible = {
        thumbs: {}
    };
    constructor(element) {
        this.min = parseInt(element.getAttribute("min"));
        this.max = parseInt(element.getAttribute("max"));
        this.inputs = {
            range: {
                left: element.querySelector(".range.left"),
                right: element.querySelector(".range.right")
            },
            number: {
                left: element.querySelector(".number.left"),
                right: element.querySelector(".number.right")
            }
        };
        for(const range in this.inputs.range) {
            this.inputs.range[range].setAttribute("min", this.min);
            this.inputs.range[range].setAttribute("max", this.max);
            this.inputs.range[range].addEventListener("mouseover", () => this.visible.thumbs[range].classList.add("hover"));
            this.inputs.range[range].addEventListener("mousedown", () => this.visible.thumbs[range].classList.add("active"));
            this.inputs.range[range].addEventListener("mouseout", () => this.visible.thumbs[range].classList.remove("hover"));
            this.inputs.range[range].addEventListener("mouseup", () => this.visible.thumbs[range].classList.remove("active"));    
        }
        this.visible.range = element.querySelector(".range.visible");
        this.visible.thumbs = {
            left: element.querySelector(".thumb.left"),
            right: element.querySelector(".thumb.right")
        }
    }
    setValues(...sides) {
        for(const side of sides) {
            const isLeft = side.key === "left" ? true : false;
            const input = this.inputs.range[side.key];
            input.value = Math[isLeft ? "min" : "max"](parseInt(side.value), isLeft ? parseInt(this.inputs.range.right.value) - 1 : parseInt(this.inputs.range.left.value) + 1);
            this.inputs.number[side.key].value = input.value
            const percent = ((input.value - this.min) / (this.max - this.min)) * 100;
            this.visible.thumbs[side.key].style[side.key] = isLeft ? percent + "%" : (100 - percent) + "%";
            this.visible.range.style[side.key] = this.visible.thumbs[side.key].style[side.key];
        }
    }
    setDefault() {
        this.setValues(
            {
                key: "left", 
                value: this.inputs.range["left"].value
            }, {
                key: "right", 
                value: this.inputs.range["right"].value
            }
        );
        this.inputs.range.left.addEventListener("input", (event) => this.setValues({key: "left", value: event.target.value}));
        this.inputs.range.right.addEventListener("input", (event) => this.setValues({key: "right", value: event.target.value}));
        for(const number in this.inputs.number) {
            this.inputs.number[number].addEventListener("input", (event) => event.target.value = event.target.value.replace(/^[^0-9].*$/g, ''))
            this.inputs.number[number].addEventListener("change", (event) => {
                let _this = event.target;
                _this.value = _this.value > 18 ? 18 : _this.value < 7 ? 7 : _this.value;
                this.setValues({key: number, value: _this.value});
            });
            this.inputs.number[number].addEventListener("blur", (event) => {
                let _this = event.target;
                _this.value = _this.value > 18 ? 18 : _this.value < 7 ? 7 : _this.value;
                this.setValues({key: number, value: _this.value});
            });
        }
    }
}

const multiRanges = document.querySelectorAll(".multi-range");

for(const multiRange of multiRanges) {
    new MultiRange(multiRange).setDefault()
}