JSON.stringify({
  input: [
    {
      name: "Addr",
      width: 4,
      type: "wire"
    },
    {
      name: "DataIn",
      width: 32,
      type: "wire"
    },
    {
      name: "MemWR",
      width: 1,
      type: "wire"
    },
    {
      name: "Clk",
      width: 1,
      type: "wire"
    }
  ],
  output: [
    {
      name: "DataOut",
      width: 32,
      type: "reg"
    }
  ]
});
