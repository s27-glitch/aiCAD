// Dummy API for Week 1 testing
// In Week 2, this will be replaced with real backend calls

export function generateDummyGeometry(prompt: string) {
  // Create a simple cylinder geometry
  const vertices: number[] = [];
  const indices: number[] = [];

  // Generate cylinder vertices
  const radius = 25;
  const height = 50;
  const segments = 32;

  // Top circle
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    vertices.push(
      Math.cos(angle) * radius,
      height / 2,
      Math.sin(angle) * radius
    );
  }

  // Bottom circle
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    vertices.push(
      Math.cos(angle) * radius,
      -height / 2,
      Math.sin(angle) * radius
    );
  }

  // Side faces
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    // Top triangle
    indices.push(i, segments + i, segments + next);
    // Bottom triangle
    indices.push(i, segments + next, next);
  }

  return {
    mesh: { vertices, indices },
    parameters: {
      diameter: 25,
      length: 50,
      material: 1
    },
    features: [
      { type: 'Extrude', diameter: 25, length: 50 }
    ]
  };
}