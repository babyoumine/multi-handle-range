const multiRanges = document.querySelectorAll(".multi-range");

for(const multiRange of multiRanges) {
    const min = parseInt(multiRange.getAttribute("min"));
    const max = parseInt(multiRange.getAttribute("max"));
    const inputs = {
        left: multiRange.querySelector(".range.left"),
        right: multiRange.querySelector(".range.right")
    }
    for(const input in inputs) {
        inputs[input].setAttribute("min", min);
        inputs[input].setAttribute("max", max);
    }
    const numberInputs = {
        left: multiRange.querySelector(".number.left"),
        right: multiRange.querySelector(".number.right")
    };
    const thumbs = {
        left: multiRange.querySelector(".thumb.left"),
        right: multiRange.querySelector(".thumb.right")
    }
    const range = multiRange.querySelector(".range.visible");

    function setValues(...sides) {
        for(const side of sides) {
            const isLeft = side.key === "left" ? true : false;
            const _this = inputs[side.key];
            _this.value = Math[isLeft ? "min" : "max"](parseInt(side.value), isLeft ? parseInt(inputs.right.value) - 1 : parseInt(inputs.left.value) + 1);
            numberInputs[side.key].value = _this.value
            const percent = ((_this.value - min) / (max - min)) * 100;
            thumbs[side.key].style[side.key] = isLeft ? percent + "%" : (100 - percent) + "%";
            range.style[side.key] = thumbs[side.key].style[side.key];
        }
    }
    for(const input in numberInputs) {
        numberInputs[input].addEventListener("input", (event) => event.target.value = event.target.value.replace(/^[^0-9].*$/g, ''))
        numberInputs[input].addEventListener("change", (event) => {
            let _this = event.target;
            _this.value = _this.value > 18 ? 18 : _this.value < 7 ? 7 : _this.value;
            setValues({key: input, value: _this.value});
        });
    }
    setValues(
        {
            key: "left", 
            value: inputs["left"].value
        }, {
            key: "right", 
            value: inputs["right"].value
        }
    );

    for(const input in inputs) {
        inputs[input].addEventListener("input", (event) => setValues({key: input, value: event.target.value}));
        inputs[input].addEventListener("mouseover", () => thumbs[input].classList.add("hover"));
        inputs[input].addEventListener("mousedown", () => thumbs[input].classList.add("active"));
        inputs[input].addEventListener("mouseout", () => thumbs[input].classList.remove("hover"));
        inputs[input].addEventListener("mouseup", () => thumbs[input].classList.remove("active"));    
    }

}