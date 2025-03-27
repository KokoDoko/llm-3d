import words from './vectordata/pcavectors.json' with { type: "json" };

function createPlot(dataPoints) {
    let x = dataPoints.map(item => item.vector[0]);
    let y = dataPoints.map(item => item.vector[1]);
    let z = dataPoints.map(item => item.vector[2]);

    let labels = dataPoints.map(p => p.word); 
    
    //Find the lowest and highest values from the combined array
    let combined = [...x, ...y, ...z];
    let range = [Math.min(...combined), Math.max(...combined)];

    // Define 3D scatter plot
    let trace = {
        x,y,z,
        mode: 'markers+text',  // Enables both markers and text labels
        text: labels,  // Assign labels
        textposition: 'top center',  // Position above points
        marker: {
            size: 8,
            color: z, // Color based on z-values // todo use kmeans 
            colorscale: 'Viridis',
            opacity: 0.8
        },
        type: 'scatter3d'
    };

    // Layout options
    let layout = {
        title: '3D Scatter Plot',
        scene: {
            xaxis: { title: 'X Axis', range },
            yaxis: { title: 'Y Axis', range },
            zaxis: { title: 'Z Axis', range }
        }
    };

    // Render the plot
    Plotly.newPlot('plot', [trace], layout);
}
createPlot(words)

window.onresize = function () {
    Plotly.Plots.resize(document.getElementById('plot'));
};


