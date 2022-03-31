function SeuNome({ set }) {
  return (
    <>
      <label>Seu Nome É </label>
      <input
        onChange={(e) => {
          set(e.target.value);
        }}
        type="text"
      />
    </>
  );
}

export default SeuNome;
