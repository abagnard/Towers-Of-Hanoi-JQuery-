function HanoiView(game, el){
  this.game = game;
  this.$el = el;
  this.clickedTower = undefined;
  this.setupTowers();
  this.clickTower();
}

HanoiView.prototype.setupTowers = function() {
  let $tower0 = $("<ul>").attr("data-num", 0).addClass('0').addClass('group');
  let $tower1 = $("<ul>").attr("data-num", 1).addClass('1').addClass('group');
  let $tower2 = $("<ul>").attr("data-num", 2).addClass('2').addClass('group');
  for(let i = 1; i < 4; i++) {
    let $disk = $("<li>").attr("data-size", i).addClass('group');
    $disk.addClass(`disk${i}`);
    $tower0.append($disk);
  }
  this.$el.append($tower0);
  this.$el.append($tower1);
  this.$el.append($tower2);
};

HanoiView.prototype.render = function(num) {
  let $towerFrom = $('ul').filter(`.${this.clickedTower}`);
  let $towerTo = $('ul').filter(`.${num}`);

  for(let i = 1; i < 4; i++) {
    let diskClass = `.disk${i}`;
    console.log(diskClass);
    let $childFrom = $towerFrom.children().filter(diskClass);
    console.log($childFrom);
    if ($childFrom.is("li")) {
      $childFrom.remove();
      $towerTo.prepend($childFrom);
      return;
    }
  }
};

HanoiView.prototype.clickTower = function() {
  $('ul').on("click", event => {
    let $tower = $(event.currentTarget);
    let num = $tower.data("num");
    if (this.clickedTower === undefined) {
      this.clickedTower = num;
    } else {
      if (this.game.move(this.clickedTower, num)) {
        this.render(num);
      } else {
          alert("Invalid Move! Try again.");
      }
      this.clickedTower = undefined;
    }
  });
};

module.exports = HanoiView;
