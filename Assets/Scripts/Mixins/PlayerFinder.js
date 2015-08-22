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
      // Find a way to return something other than zero to singal that the
      // player wasn't found.
      return Vector2.zero;
    }
  }
}
