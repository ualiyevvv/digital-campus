export class Tooltip {

    constructor(tooltipId) {
        this.tooltip = document.getElementById(tooltipId)
        if (!this.tooltip) {
            console.error('Tooltip element not found');
        }
    }

    updateTooltipContent() {
        // console.log('TOOPLTIP EDGE',edge)
        this.tooltip.innerHTML = `<b>tooltip content<br/>`;
        // this.tooltip.innerHTML += `<b>send_sum: </b>${edge.properties?.send_sum}, <b>receive_sum: </b>${edge.properties?.receive_sum} <br/>`;
        // this.tooltip.innerHTML += '<b>Transactions:</b>';
        // edge.properties?.transactions.map(transaction => {
        //     this.tooltip.innerHTML += ` <br/>${transaction.hash}`
        // })
    }

    positionTooltip(x, y) {
        // Смещение для предотвращения наложения tooltip непосредственно на курсор
        const xOffset = 50;
        const yOffset = 60;

        this.tooltip.style.left = `${x - xOffset}px`;
        this.tooltip.style.top = `${y - yOffset}px`;
    }

    showTooltip() {
        console.log('tooltip')
        this.tooltip.style.display = 'block';
    }

    hideTooltip() {
        this.tooltip.style.display = 'none';
    }

}