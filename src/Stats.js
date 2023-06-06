import { Home } from "./components/Home";

export function Stats() {
  return (
    <div className="newgame">
      <Home />
      <div style={{ width: "80vw", marginLeft: "auto", marginRight: "auto", paddingTop: "4vh" }}>
        <div class="col-md-6  ">
          <div class="card mb-4 mb-md-0">
            <div class="card-body">
              <p class="mb-4"><span class="text-primary font-italic me-1">All Time Stats</span>
              </p>
              <p class="mb-1" style={{ fontSize: ".77rem" }}><strong>Wins</strong></p>
              <p>32</p>
              <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}><strong>Losses</strong></p>
              <p>10</p>
              <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}><strong>Career Record</strong></p>
              <p>32-10</p>
              <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}><strong>Win Percentage</strong></p>
              <p>76%</p>
              <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}><strong>MVP Count</strong></p>
              15
              <p class=" mt-4 mb-1" style={{ fontSize: ".77rem" }}><strong>Points</strong></p>
              <p>100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
