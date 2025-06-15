export const tdPetPayload = {
  id: Date.now(),
  name: 'Buddy',
  category: {
    id: 1,
    name: 'Dogs'
  },
  photoUrls: ['https://picsum.photos/200/300'],
  tags: [{ id: 1, name: 'friendly' }],
  status: 'available'
};

export const tdUpdatedPetPayload = {
  ...tdPetPayload,
  name: 'Max',
  status: 'sold'
};