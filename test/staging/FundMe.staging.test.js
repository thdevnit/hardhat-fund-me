const { getNamedAccounts, network, ethers } = require("hardhat")
const { assert } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

//let variable = true
//let somevar = variable ? "yes" : "no"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          let sendValue = ethers.utils.parseEther("1")
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
