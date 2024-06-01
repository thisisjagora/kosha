import React from 'react';

export default function MessagePage({ params }: { params: { slug: string } }) {
  return <div>Chat with ID: {params.slug}</div>;
}
