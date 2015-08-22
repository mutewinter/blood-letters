#pragma strict

class PlayerFinder extends MonoBehaviour {
  // Private variables
  private var player: Player;

  function forceDirectionToPlayer() : Vector2 {
    if (!player) {
      var playerObject = GameObject.FindWithTag('Player');
      player = playerObject ? playerObject.GetComponent(Player) : null;
    }

    if (player) {
      return (player.transform.position - transform.position).normalized;
    } else {
      return Vector2.zero;
    }
  }
}
