var slider = document.querySelector("#renderScaleSlider");


slider.addEventListener("input", (event) =>
{
    renderScale = event.target.value;
    UpdateAspect();
});

window.addEventListener("resize", () =>
{
    UpdateAspect();
});
